package morningrolecall.heulgit.eureka.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "eureka_image")
public class EurekaImage {

	@Id
	@Column(name = "file_uri", nullable = false)
	private String fileUri;

	@ManyToOne
	@JoinColumn(name = "eureka_id", nullable = false)
	private Eureka eureka;

	public static EurekaImage of(String fileUri, Eureka eureka) {
		return new EurekaImage(fileUri, eureka);
	}

	private EurekaImage(String fileUri, Eureka eureka) {
		this.fileUri = fileUri;
		this.eureka = eureka;
	}
}